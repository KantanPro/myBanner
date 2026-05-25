( function( wp ) {
	'use strict';

	if ( ! wp || ! wp.blocks || ! wp.blockEditor || ! wp.components || ! wp.element || ! wp.serverSideRender ) {
		return;
	}

	const { registerBlockType } = wp.blocks;
	const { useBlockProps } = wp.blockEditor;
	const { Placeholder, Disabled } = wp.components;
	const { createElement: el } = wp.element;
	const ServerSideRender = wp.serverSideRender;

	registerBlockType( 'my-banner/banner', {
		edit: function( props ) {
			const blockProps = useBlockProps( {
				className: 'my-banner-block-editor',
			} );

			return el(
				'div',
				blockProps,
				el(
					Placeholder,
					{
						icon: 'format-image',
						label: wp.i18n.__( 'myBanner', 'my-banner' ),
						instructions: wp.i18n.__(
							'「myBanner」メニューで登録したバナーをこの位置に表示します。複数登録時はローテーションします。',
							'my-banner'
						),
					},
					el(
						Disabled,
						null,
						el( ServerSideRender, {
							block: 'my-banner/banner',
							attributes: props.attributes,
						} )
					)
				)
			);
		},
		save: function() {
			return null;
		},
	} );
} )( window.wp );
