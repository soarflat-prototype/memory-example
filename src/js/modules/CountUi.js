/**
 * 残り回数のビューを管理するクラス
 */
function CountUi() {
  this.$el = $('.js-count')
}

CountUi.prototype.set = function (count) {
  this.$el.text(count);
}

CountUi.prototype.update = function (count) {
  this.$el.text(count);
};

CountUi.prototype.show = function () {
  var promise = $.Deferred();

  velocity(this.$el, {
    scale: [1, 0],
  }, {
    easing: [.18, 1.25, .68, 1.17],
    display: 'block',
    complete: function () {
      promise.resolve();
    }
  });

  return promise;
};

CountUi.prototype.hide = function () {
  this.$el.hide();
};

module.exports = CountUi;
