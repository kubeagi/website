import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as PrismReactRenderer from 'prism-react-renderer';

const config: Config = {
  title: 'KubeAGI',
  tagline: 'A diverse, simple, and secure one-stop LLMOps platform',
  url: 'https://kubeagi.k8s.com.cn',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  markdown: {
    format: 'mdx',
    mermaid: true,
    preprocessor: ({filePath, fileContent}) => {
      return fileContent.replaceAll('{{MY_VAR}}', 'MY_VALUE');
    },
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'KubeAGI', // Usually your GitHub org/user name.
  projectName: 'KubeAGI', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en','zh-Hans'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      'zh-Hans': {
        label: '简体中文',
      },
    },
  },

  plugins: [
    'plugin-image-zoom',
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    {
      announcementBar: {
        id: 'start',
        content:
            '⭐️ If you like KubeAGI, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/kubeagi/arcadia">GitHub</a>! ⭐️',
      },
      navbar: {
        title: 'KubeAGI',
        logo: {
          alt: 'KubeAGI Logo',
          src: 'img/kubeagi-logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          /*{to: '/blog', label: 'Blog', position: 'left'},*/
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/kubeagi/arcadia',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      imageZoom: {
        // CSS selector to apply the plugin to, defaults to '.markdown img'
        selector: '.markdown img',
        // Optional medium-zoom options
        // see: https://www.npmjs.com/package/medium-zoom#options
        options: {
          margin: 24,
          background: 'transparent',
          scrollOffset: 0,
          // Remove the options below, or it'll have 'Cannot read properties of null' error.
          // container: '#zoom-container',
          // template: '#zoom-template',
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/kubeagi',
              },
            ],
          },
          {
            title: 'More',
            items: [
              /*{
                label: 'Blog',
                to: '/blog',
              },*/
              {
                label: 'GitHub',
                href: 'https://github.com/kubeagi/arcadia',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KubeAGI. Built with Docusaurus.`,
      },
      prism: {
        theme: PrismReactRenderer.themes.github,
        darkTheme: PrismReactRenderer.themes.dracula,
      },
    } satisfies Preset.ThemeConfig,
};

export default config;
