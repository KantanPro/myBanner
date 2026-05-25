( function( $ ) {
	'use strict';

	let originalSendAttachment = null;

	function resolveAttachmentUrl( attachment ) {
		if ( ! attachment ) {
			return '';
		}

		if ( attachment.url ) {
			return attachment.url;
		}

		if ( attachment.sizes && attachment.sizes.full && attachment.sizes.full.url ) {
			return attachment.sizes.full.url;
		}

		if ( attachment.attributes && attachment.attributes.url ) {
			return attachment.attributes.url;
		}

		return '';
	}

	function resolveAttachmentId( attachment ) {
		if ( ! attachment ) {
			return 0;
		}

		if ( attachment.id ) {
			return parseInt( attachment.id, 10 ) || 0;
		}

		if ( attachment.attributes && attachment.attributes.id ) {
			return parseInt( attachment.attributes.id, 10 ) || 0;
		}

		return 0;
	}

	function getImageType( $trigger ) {
		return $trigger.data( 'image-type' ) === 'mobile' ? 'mobile' : 'desktop';
	}

	function getImageField( $item, imageType ) {
		return imageType === 'mobile'
			? $item.find( '.my-banner-mobile-image-url' )
			: $item.find( '.my-banner-image-url' );
	}

	function getImagePreview( $item, imageType ) {
		return imageType === 'mobile'
			? $item.find( '.my-banner-mobile-image-preview' )
			: $item.find( '.my-banner-image-preview' );
	}

	function updatePreview( $item, imageUrl, imageType ) {
		const $preview = getImagePreview( $item, imageType );
		if ( ! $preview.length ) {
			return;
		}

		if ( imageUrl ) {
			$preview.attr( 'src', imageUrl ).show();
		} else {
			$preview.attr( 'src', '' ).hide();
		}
	}

	function setImageUrl( $item, imageUrl, imageType ) {
		const $field = getImageField( $item, imageType );
		if ( ! $field.length ) {
			return;
		}

		$field.val( imageUrl ).trigger( 'change' );
		updatePreview( $item, imageUrl, imageType );
	}

	function fetchUrlByAttachmentId( $item, attachmentId, imageType ) {
		if ( ! attachmentId || ! wp.media || ! wp.media.attachment ) {
			return;
		}

		const attachmentModel = wp.media.attachment( attachmentId );
		if ( ! attachmentModel ) {
			return;
		}

		attachmentModel.fetch().then( function() {
			const attrs = attachmentModel.attributes || {};
			const imageUrl = resolveAttachmentUrl( attrs );
			setImageUrl( $item, imageUrl, imageType );
		} );
	}

	function applySelectedImage( $item, selection, imageType ) {
		if ( ! selection || ! selection.first ) {
			return;
		}

		const model = selection.first();
		if ( ! model ) {
			return;
		}

		const attachment = model.toJSON ? model.toJSON() : model;
		const imageUrl = resolveAttachmentUrl( attachment );
		if ( ! imageUrl ) {
			const attachmentId = resolveAttachmentId( attachment );
			fetchUrlByAttachmentId( $item, attachmentId, imageType );
			return;
		}

		setImageUrl( $item, imageUrl, imageType );
	}

	function openMediaLibrary( $item, imageType ) {
		if ( typeof wp === 'undefined' || ! wp.media ) {
			window.alert(
				window.myBannerAdmin && window.myBannerAdmin.media_error
					? window.myBannerAdmin.media_error
					: 'Media library unavailable.'
			);
			return;
		}

		const $trigger = $item.find( '.my-banner-select-image[data-image-type="' + imageType + '"]' );
		const frameTitle = imageType === 'mobile'
			? ( window.myBannerAdmin && window.myBannerAdmin.mobile_title ? window.myBannerAdmin.mobile_title : 'スマホ用バナー画像を選択' )
			: ( window.myBannerAdmin && window.myBannerAdmin.title ? window.myBannerAdmin.title : 'バナー画像を選択' );

		if ( wp.media.editor && wp.media.editor.open ) {
			if ( null === originalSendAttachment ) {
				originalSendAttachment = wp.media.editor.send.attachment;
			}

			wp.media.editor.send.attachment = function( props, attachment ) {
				const imageUrl = resolveAttachmentUrl( attachment );
				if ( imageUrl ) {
					setImageUrl( $item, imageUrl, imageType );
				} else {
					const attachmentId = resolveAttachmentId( attachment );
					fetchUrlByAttachmentId( $item, attachmentId, imageType );
				}

				if ( originalSendAttachment ) {
					wp.media.editor.send.attachment = originalSendAttachment;
				}
			};

			wp.media.editor.open( $trigger );
			return;
		}

		const mediaFrame = wp.media( {
			title: frameTitle,
			button: {
				text: window.myBannerAdmin && window.myBannerAdmin.button_text ? window.myBannerAdmin.button_text : 'この画像を使用',
			},
			library: {
				type: 'image',
			},
			multiple: false,
		} );

		mediaFrame.on( 'select', function() {
			const selection = mediaFrame.state().get( 'selection' );
			applySelectedImage( $item, selection, imageType );
		} );

		mediaFrame.on( 'insert', function() {
			const selection = mediaFrame.state().get( 'selection' );
			applySelectedImage( $item, selection, imageType );
		} );

		mediaFrame.open();
	}

	function reindexBannerItems() {
		$( '#my-banner-items .my-banner-item' ).each( function( index ) {
			const $item = $( this );
			$item.attr( 'data-index', index );
			$item.find( '.my-banner-item-title' ).text(
				( window.myBannerAdmin && window.myBannerAdmin.item_label ? window.myBannerAdmin.item_label : 'バナー' ) + ' #' + ( index + 1 )
			);

			$item.find( '[name]' ).each( function() {
				const $field = $( this );
				const name = $field.attr( 'name' );
				if ( ! name || name.indexOf( 'my_banner_options[banners][' ) !== 0 ) {
					return;
				}
				const fieldKey = name.replace( /^my_banner_options\[banners\]\[\d+\]\[/, '' ).replace( /\]$/, '' );
				$field.attr( 'name', 'my_banner_options[banners][' + index + '][' + fieldKey + ']' );
			} );
		} );
	}

	function createBannerItemFromTemplate() {
		const template = $( '#my-banner-item-template' ).html();
		if ( ! template ) {
			return null;
		}

		const index = $( '#my-banner-items .my-banner-item' ).length;
		const uniqueId = 'banner_' + Date.now() + '_' + Math.floor( Math.random() * 1000 );
		const html = template
			.replace( /\{\{INDEX\}\}/g, String( index ) )
			.replace( /\{\{ID\}\}/g, uniqueId );

		return $( html );
	}

	$( function() {
		$( document ).on( 'click', '.my-banner-select-image', function( event ) {
			event.preventDefault();
			const $item = $( this ).closest( '.my-banner-item' );
			openMediaLibrary( $item, getImageType( $( this ) ) );
		} );

		$( document ).on( 'click', '.my-banner-clear-image', function( event ) {
			event.preventDefault();
			const $item = $( this ).closest( '.my-banner-item' );
			setImageUrl( $item, '', getImageType( $( this ) ) );
		} );

		$( '#my-banner-add-item' ).on( 'click', function( event ) {
			event.preventDefault();
			const $item = createBannerItemFromTemplate();
			if ( ! $item ) {
				return;
			}
			$( '#my-banner-items' ).append( $item );
			reindexBannerItems();
		} );

		$( document ).on( 'click', '.my-banner-remove-item', function( event ) {
			event.preventDefault();
			const $items = $( '#my-banner-items .my-banner-item' );
			if ( $items.length <= 1 ) {
				window.alert(
					window.myBannerAdmin && window.myBannerAdmin.remove_last_error
						? window.myBannerAdmin.remove_last_error
						: '最低1件のバナーが必要です。'
				);
				return;
			}

			$( this ).closest( '.my-banner-item' ).remove();
			reindexBannerItems();
		} );
	} );
} )( jQuery );
