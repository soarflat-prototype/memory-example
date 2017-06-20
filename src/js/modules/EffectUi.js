/**
 * エフェクトのビューを管理するクラス
 */
function EffectUi() {
  this.$good = $('.js-good');
  this.$bad = $('.js-bad');

  this.$good.hide();
  this.$bad.hide();
}

EffectUi.prototype.good = function () {
  var promise = $.Deferred();

  this.$good.css('opacity', 1);
  velocity(this.$good, {
    rotateZ: [0, '360deg']
  }, {
    easing: [.18, 1.25, .68, 1.17],
    display: 'block',
    complete: function () {
      velocity(this, 'fadeOut', {
        delay: 500,
        duration: 300,
        complete: function () {
          promise.resolve();
        }
      });
    }
  });

  return promise;
};

EffectUi.prototype.bad = function () {
  var promise = $.Deferred();

  this.$bad.css('opacity', 1);
  velocity(this.$bad, {
    rotateZ: [0, '360deg']
  }, {
    easing: [.18, 1.25, .68, 1.17],
    display: 'block',
    complete: function () {
      velocity(this, 'fadeOut', {
        delay: 500,
        duration: 300,
        complete: function () {
          promise.resolve();
        }
      });
    }
  });

  return promise;
};

module.exports = EffectUi;
