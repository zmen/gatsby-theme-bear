/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'antd/dist/antd.css';
import './src/styles/global.css'
import './src/styles/github-markdown.css'
import './src/styles/prism-tomorrow.css'
import './src/styles/vendor-reset.css';

import wrapWithRootElement from './wrapRootElement';

export const wrapRootElement = wrapWithRootElement ;
