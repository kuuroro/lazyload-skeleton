import './lazy-skeleton.css';

import lazyLoad from './lazyload'
import skeleton from './skeleton'

window.addEventListener('load', function () {
    skeleton();
    lazyLoad();
   
})

var lazySkeleton;
export default lazySkeleton;