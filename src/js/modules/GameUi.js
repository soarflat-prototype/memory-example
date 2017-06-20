/**
 * ゲームのビューを管理するクラス
 */
function GameUi(emitter) {
  this.$window = $(window);
  this.$openingArea = $('.js-opening');
  this.$start = this.$openingArea.find('.opening-button');
  this.$playArea = $('.js-play');

  this.emitter = emitter;
}

/**
 * ビューの初期化
 */
GameUi.prototype.initialize = function () {
  var $heading = $('.js-heading');
  var areaHeight = this.$window.height() - $heading.outerHeight();

  this.$openingArea.height(areaHeight);
  this.$playArea.height(areaHeight).hide();
};

/**
 * イベントをバインド
 */
GameUi.prototype.bind = function () {
  var self = this;

  this.$start.on('click', function () {
    self.emitter.emit('clickStart.GameUi');
  });
};

/**
 * オープニングエリアを非表示にする
 */
GameUi.prototype.hideOpening = function () {
  this.$openingArea.hide();
};

/**
 * プレイエリアを表示する
 */
GameUi.prototype.showPlay = function () {
  this.$playArea.show();
};

module.exports = GameUi;
