import './lazy-skeleton.css';

import lazyLoad from './lazyload'
import skeleton from './skeleton'

window.addEventListener('load', function () {
    lazyLoad();
    skeleton();
})

var lazySkeleton;
export default lazySkeleton;