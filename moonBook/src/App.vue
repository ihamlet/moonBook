<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import './../src/components/lib/css/neat.css'
import 'animate.css'

export default {
  name: 'App'
}
</script>

<style>
/* 公共样式 */
*::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
  display: none;
}

input,
textarea {
  border: 0;
  -webkit-appearance: none;
}

@font-face {
  font-family: 'iconfont';  /* project id 893274 */
  src: url('//at.alicdn.com/t/font_893274_54ha0m1tzc4.eot');
  src: url('//at.alicdn.com/t/font_893274_54ha0m1tzc4.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_893274_54ha0m1tzc4.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_893274_54ha0m1tzc4.woff') format('woff'),
  url('//at.alicdn.com/t/font_893274_54ha0m1tzc4.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_893274_54ha0m1tzc4.svg#iconfont') format('svg');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.wrap {
  flex-wrap: wrap;
}

.flex {
  display: flex;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-align {
  align-items: center;
}

.flex-justify {
  justify-content: center;
}

.text-center {
  text-align: center;
}

body {
  color: #606266;
  background: #f2f6fc;
}

.scroll-x,
.scroll-y {
  -webkit-overflow-scrolling: touch;
}

.scroll-x {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.625rem /* 10/16 */ 0;
  background: #fff;
  display: flex;
  flex-wrap: nowrap;
}

.scroll-item {
  display: inline-block;
}

.head-background {
  background-image: linear-gradient(30deg, #2afadf 10%, #4c83ff 100%);
}

/* 动画 */
.first {
  animation-delay: 0.1s;
}

.second {
  animation-delay: 1s;
}

.third {
  animation-delay: 2s;
}

.an-0 {
  animation-delay: 50ms;
}

.an-1 {
  animation-delay: 150ms;
}

.an-2 {
  animation-delay: 300ms;
}

.an-3 {
  animation-delay: 500ms;
}

.an-4 {
  animation-delay: 750ms;
}

/* 列表 */
.cover {
  width: 100%;
  height: 6.25rem /* 100/16 */;
  overflow: hidden;
}

/* 主题色 */
.theme-btn.van-button--primary,
.order-popup .content::before,
.theme-switch .van-switch--on,
.theme-background {
  background: linear-gradient(135deg, #00bcd4, #409eff);
}

.theme-switch .van-switch {
  background-color: #ebeef5;
}

.theme-btn.van-button--plain.van-button--primary,
.theme-radio.van-radio .van-icon-checked,
body.theme .van-nav-bar__text,
body.theme .van-dialog__confirm,
body.theme .van-dialog__confirm:active,
body.theme .head-bar-text,
.theme-color {
  color: #409eff;
}

.theme-checkbox .van-checkbox__icon--checked .van-icon {
  background-color: #409eff;
  border-color: #409eff;
}

.theme-btn.van-button--plain.van-button--primary {
  background: transparent;
  border: 0.0625rem /* 1/16 */ solid #409eff;
}

.punch .theme-btn,
.theme-borrowing-btn {
  background: linear-gradient(90deg, #ff765c, #ff23b3);
}

.theme-borrowing-btn.van-button--primary,
.theme-btn.van-button--primary {
  border: none;
}

.theme-textarea .van-field__control {
  border-radius: 0.3125rem /* 5/16 */;
  font-size: 1rem /* 16/16 */;
  line-height: 1.8;
}

.theme-btn i.iconfont {
  margin-right: 0.3125rem /* 5/16 */;
}

.theme-nav.van-nav-bar{
  background: transparent;
}

.theme-nav.van-nav-bar .van-nav-bar__title{
  color: #fff;
}

.theme-nav.van-nav-bar::after {
  display: none;
}



.theme-nav.van-nav-bar .btn-right .van-icon {
  color: #fff;
  font-size: 1.25rem /* 20/16 */;
}

.head-bar-icon i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.theme-nav .head-bar-icon i.iconfont{
  color: #fff;
}

.theme-nav .head-bar-text .text,
.theme-nav .head-bar-text .van-icon-arrow-left {
  color: #fff;
}

.default-head-bar-background {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
}

.module {
  margin-bottom: 0.625rem /* 10/16 */;
  background: #fff;
}

.punch,
.apply {
  position: fixed;
  bottom: 4.875rem /* 78/16 */;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.apply .theme-btn {
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(64, 158, 255, 0.3);
}

.apply .theme-borrowing-btn {
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(255, 35, 179, 0.3);
}

/* cell底栏布局 */
.foot-bar-left,
.foot-bar-right {
  position: absolute;
  bottom: 0;
}

.foot-bar-right {
  right: 0;
}

.card-list {
  padding: 1.25rem /* 20/16 */;
}

.img-grid {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  background: transparent;
  margin-top: .3125rem /* 5/16 */;
  background-size: cover;
  background-position: 50%;
}

.img-grid.transparent {
  background-color: transparent;
}

/* 图片懒加载 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

img.lazy {
  display: block;
}

img.lazy[lazy='error'],
img.lazy[lazy='loaded'] {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}

img.lazy[lazy='loading'],
img.lazy[lazy='error'],
.cover {
  background: #dcdfe6;
}

/* 搜索 */
.head-bar {
  width: 100%;
  padding: 0.375rem /* 6/16 */ 0;
  position: fixed;
  z-index: 99;
}

.left-btn,
.right-btn {
  flex: 1;
  text-align: center;
  color: #fff;
}

.left-btn {
  font-size: 0.8125rem /* 13/16 */;
}

.right-btn span {
  font-size: 0.75rem /* 12/16 */;
  color: #fff;
}

.right-btn i.iconfont {
  font-size: 1.375rem /* 22/16 */;
  color: rgba(255, 255, 255, 0.8);
}

.head-bar,
.search-bar {
  height: 2.125rem /* 34/16 */;
}

.theme-background .search-bar {
  background: #fff;
}

.search-bar {
  flex: 5;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2.125rem /* 34/16 */;
  margin: 0 auto;
  line-height: 2.125rem /* 34/16 */;
  padding-left: 2rem /* 32/16 */;
  font-size: 0.8125rem /* 13/16 */;
  position: relative;
  box-shadow: 0 0.125rem /* 2/16 */ 0.375rem /* 6/16 */ rgba(0, 0, 0, 0.1);
}

.search-bar i.iconfont {
  position: absolute;
  left: 0.625rem /* 10/16 */;
}

/* swipe 轮播图 */
.swipe-content .van-swipe-item:nth-child(even) {
  background-color: #39a9ed;
}

.swipe-content .van-swipe-item:nth-child(odd) {
  background-color: #66c6f2;
}

.swipe-content {
  width: 100%;
  overflow: hidden;
}

.swipe-content .van-swipe-item {
  color: #fff;
  font-size: 1.5rem /* 24/16 */;
  text-align: center;
}

.swipe-content .van-swipe__indicator {
  background: rgba(255, 255, 255, 0.6);
  transition: width 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.swipe-content .van-swipe__indicator--active {
  background: #fff;
  width: 0.9375rem /* 15/16 */;
  border-radius: 0.375rem;
}

.swipe-content .van-swipe__indicators {
  margin-bottom: 0.9375rem /* 15/16 */;
}

/* 模块 */
.card {
  padding: 0 0.3125rem /* 5/16 */;
}

.module-title {
  font-size: 0.875rem /* 14/16 */;
  color: #333;
  background: #fff;
  height: 3rem /* 48/16 */;
  line-height: 3rem /* 48/16 */;
  text-align: center;
  position: relative;
}

.module-title::before,
.module-title::after {
  content: '';
  width: 3.125rem /* 50/16 */;
  height: 0.0625rem /* 1/16 */;
  background: #dcdfe6;
  position: absolute;
  bottom: 50%;
}

.module-title::before {
  left: 25%;
}

.module-title::after {
  right: 25%;
}

.page-padding {
  padding-bottom: 7.5rem /* 120/16 */;
}

.bottom-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
}

/* 文字排版 */
.title {
  font-size: 1rem /* 16/16 */;
  color: #303133;
}

.info {
  color: #909399;
}

.price {
  color: #f56c6c;
  font-size: 1.125rem /* 18/16 */;
}

.price span.unit {
  font-size: 0.8125rem /* 13/16 */;
  margin-right: 0.125rem /* 2/16 */;
}

.price span.free {
  font-size: 1rem /* 16/16 */;
  color: #e6a23c;
}

.school {
  text-align: right;
}

.cropper-popup,
.page-popup {
  width: 100%;
  height: 100vh;
}

.card-popup {
  width: 18.75rem /* 300/16 */;
  overflow: hidden;
}

.page-popup-layer {
  width: 100%;
}

.cropper-popup {
  width: 100%;
  height: 100vh;
}

.cropper-popup .theme-btn {
  position: fixed;
  bottom: 1.875rem /* 30/16 */;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

/* 订单 */
.order-popup {
  padding: 1.875rem /* 30/16 */ 0;
}

.order-popup .content {
  width: 20rem /* 320/16 */;
  margin: 0 auto;
  position: relative;
}

.order-popup .content::before {
  content: '';
  position: absolute;
  width: 3.75rem /* 60/16 */;
  height: 0.375rem /* 6/16 */;
  left: 0;
  top: -1.875rem /* 30/16 */;
}

.order-popup .content .list {
  padding: 0.9375rem /* 15/16 */ 0;
}

.order-popup .content .list .item {
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
}

/* 图片灯箱 */
.video-box-popup.van-popup,
.picture-box-popup.van-popup {
  width: 100%;
  height: 100vh;
}

.video-box-popup.van-popup{
  background: #fff;
}

.picture-box-popup.van-popup {
  background: #000;
}

.icon-right {
  line-height: 2;
  color: #dcdfe6;
}

.icon-right i.iconfont {
  font-size: 1.5rem /* 24/16 */;
}

/* 徽章 */
.badge {
  padding: 0 0.25em;
  text-align: center;
  min-width: 1.4em;
  line-height: 1.4;
  text-align: center;
  border-radius: 0.7em;
  background: #f44336;
  color: #fff;
  font-size: 0.75rem /* 12/16 */;
  transform: scale(0.9);
}

.explain {
  font-size: .8125rem /* 13/16 */;
  color: #909399;
}

.explain b {
  margin-bottom: 0.3125rem /* 5/16 */;
  display: block;
}

.explain p {
  margin-bottom: 0.3125rem /* 5/16 */;
  line-height: 1.8;
  text-align: justify;
}
/* end */
/* icon */
i.iconfont.rotate-45,
i.iconfont.rotate {
  display: inline-block;
  transition: all 600ms cubic-bezier(0.19, 1, 0.22, 1);
}

i.iconfont.rotate-45 {
  transform: rotate(45deg);
}

i.iconfont.rotate {
  transform: rotate(180deg);
}

.iconfont.highlight {
  background: linear-gradient(135deg, #ff2a00, #ff00af);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
}

.iconfont.highlight.star{
  background: linear-gradient(135deg, #FFEB3B, #FF9800);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
}

.social div {
  flex: 1;
  text-align: center;
}

.social div i.iconfont {
  margin-right: 0.3125rem /* 5/16 */;
}

.module-card {
  background: #fff;
  border-radius: 0.625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ -0.3125rem /* 5/16 */ rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 0.875rem /* 14/16 */;
  margin-left: 0.9375rem /* 15/16 */;
  height: 3rem /* 48/16 */;
  line-height: 3rem /* 48/16 */;
}

.avatar-uploader {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
  margin: 0 auto;
  padding: 1.25rem /* 20/16 */ 0;
  position: relative;
}

.avatar-uploader img {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
  border-radius: 50%;
}

.avatar-uploader i.iconfont {
  position: absolute;
  font-size: 1.875rem /* 30/16 */;
  top: 0.9375rem /* 15/16 */;
  left: -0.125rem /* 2/16 */;
  transform: rotate(-40deg);
}

.avatar-uploader .van-uploader {
  width: 100%;
  height: 100%;
}

.prompt {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.prompt .text {
  position: absolute;
  z-index: 10;
  bottom: -0.125rem /* 2/16 */;
  height: 1.5625rem /* 25/16 */;
  width: 6.25rem /* 100/16 */;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  font-size: 0.75rem /* 12/16 */;
  color: #fff;
  transform: scale(0.9);
}

.form-submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.btn-submit {
  padding: 1.25rem /* 20/16 */ 0.625rem /* 10/16 */;
}

.van-field__error-message {
  text-align: right;
}

.silde {
  height: 0;
}

.school-name {
  font-size: 1rem /* 16/16 */;
  color: #303133;
}

.school-address {
  width: 18.75rem /* 300/16 */;
  color: #909399;
}

/* 搜索 */
.form-search {
  position: relative;
}

.form-search i.clear {
  position: absolute;
  right: 0.625rem /* 10/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #c0c4cc;
}

/* 尚无记录 */
.not-content {
  width: 100%;
  height: 12.5rem /* 200/16 */;
  background: #fff;
  text-align: center;
  line-height: 12.5rem /* 200/16 */;
  color: #c0c4cc;
}

.bar-fixed.van-nav-bar--fixed {
  position: sticky;
}

/* 登录 */
.login .van-cell-group {
  background: transparent;
}

.login .form .van-field__control {
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  padding-left: 2.5rem /* 40/16 */;
  font-size: 1rem /* 16/16 */;
  font-weight: 700;
}

.login .form .van-field__control::-webkit-input-placeholder {
  font-weight: normal;
}

.login .van-field {
  margin-bottom: 0.625rem /* 10/16 */;
  box-shadow: 0 0.625rem /* 10/16 */ 1.875rem /* 30/16 */ -0.5rem /* 8/16 */ rgba(0, 0, 0, 0.1);
  border-radius: 0.3125rem /* 5/16 */;
}

/* 底部tab */
.footer-bar .van-info {
  top: -0.25rem /* 4/16 */;
  border: none;
}

/* 内容 */
.video-cover {
  position: relative;
  width: 100%;
}

.video-cover .play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3.5rem /* 56/16 */;
  height: 3.5rem /* 56/16 */;
  text-align: center;
  line-height: 3.5rem /* 56/16 */;
  transform: translate3d(-50%, -50%, 0);
}

.video-cover .play i.iconfont {
  color: #fff;
  font-size: 3.5rem /* 56/16 */;
}

video {
  width: 100%;
}

/* 文章 */

.article-content {
  background: #fff;
  padding: 1.25rem /* 20/16 */;
  position: relative;
  overflow: hidden;
}

.article-content .content img {
  margin: 1.25rem /* 20/16 */ auto;
  display: block;
}

.article-content .content p {
  font-size: 1.125rem /* 18/16 */ !important;
  margin: 0.625rem /* 10/16 */ 0;
}

.long-article-thumb{
  width: 100%;
  height: 9.375rem /* 150/16 */;
  overflow: hidden;
  margin-bottom: .625rem /* 10/16 */;
  position: relative;
}

.long-article-thumb img{
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.close {
  position: absolute;
  right: 0.625rem /* 10/16 */;
  top: 0.625rem /* 10/16 */;
  z-index: 10;
}

.close i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #dcdfe6;
}

/* 卡列表 */
.no-list {
  text-align: center;
  height: 12.5rem /* 200/16 */;
  line-height: 12.5rem /* 200/16 */;
  color: #c0c4cc;
  background: #fff;
}

i.iconfont.vip-2 {
  background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
  -webkit-background-clip: text;
  color: transparent;
}

i.iconfont.vip-3 {
  background-image: linear-gradient(-225deg,  #2cd8d5 0%,#c5c1ff 56%,#ffbac3 100%);
  -webkit-background-clip: text;
  color: transparent;
}

i.iconfont.vip-1 {
  background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
  -webkit-background-clip: text;
  color: transparent;
}

/* 3D封面 */
.three-d-book {
  perspective: 350;
  position: relative;
}

.three-d-book-cover {
  background: linear-gradient(135deg, #00bcd4, #409eff);
  width: 6.875rem /* 110/16 */;
  margin: 0 auto;
  padding: 0.625rem 0;
  transform: rotateY(8deg);
  position: relative;
  perspective: 80;
}

.three-d-book-cover::before {
  content: '';
  width: 0.625rem /* 10/16 */;
  height: 100%;
  background: linear-gradient(135deg, #f2f6fc, #dcdfe6);
  position: absolute;
  transform: rotateY(-32deg);
  left: -0.5rem /* 8/16 */;
  top: 0;
}

.three-d-box,
.three-d-book-cover {
  height: 7.5rem /* 120/16 */;
}

.three-d-book-name {
  color: #fff;
  width: 5.625rem /* 90/16 */;
  margin: 0 auto;
  font-size: 0.8125rem;
  height: 3.125rem /* 50/16 */;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}

.three-d-book-author {
  padding: 0.625rem;
  text-align: right;
  background-image: linear-gradient(180deg, #fff, #f2f6fc);
  font-size: 0.75rem;
  box-shadow: 0 5px 20px -9px rgba(0, 0, 0, 0.5);
  margin-top: 1.25rem;
}

.thumb{
  position: relative;
  overflow: hidden;
}

.thumb .iconfont{
  font-size: 3.125rem /* 50/16 */;
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  transform: translate3d(-50%, -50%, 0);
}

.img-grid.long{
  padding-bottom: 150%;
}

.img-preview {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
}

.photo-tag {
  position: absolute;
  right: 0.3125rem /* 5/16 */;
  bottom: 0.3125rem /* 5/16 */;
}
</style>
