/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */
module.exports = {
  link: [
    /** <link> tags for 'apple-touch-icon' (AKA Web Clips). **/
    // TODO: Add icons of size: 57x57, 60x60, 72x72, 76x76, 114x114
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/fabric8_icon_57px.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/assets/icon/fabric8_icon_60px.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/assets/icon/fabric8_icon_72px.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/icon/fabric8_icon_76px.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/assets/icon/fabric8_icon_114px.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/assets/icon/fabric8_icon_120px.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/assets/icon/fabric8_icon_144px.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/assets/icon/fabric8_icon_152px.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/icon/fabric8_icon_180px.png' },

    /** <link> tags for android web app icons **/
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/assets/icon/fabric8_icon_192px.png' },

    /** <link> tags for favicons **/
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/icon/fabric8_icon_32px.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/icon/fabric8_icon_96px.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/icon/fabric8_icon_16px.png' },

    /** <link> tags for a Web App Manifest **/
    { rel: 'manifest', href: '/assets/manifest.json' }
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#00bcd4' },
    { name: 'msapplication-TileImage', content: '/assets/icon/fabric8_icon_144px.png', '=content': true },
    { name: 'theme-color', content: '#ffffff' }
  ]
};
