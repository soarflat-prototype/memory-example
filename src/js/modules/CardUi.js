/**
 * カードのビューを管理するクラス
 */
function CardUi(emitter) {
  this.emitter = emitter;

  this.$el = $('.js-cards');

  this.disable = false;
}

/**
 * 引数のカード情報を描画する
 * @param {Array} cardData
 */
CardUi.prototype.render = function (cardData) {
  var div = '';

  cardData.forEach(function (data, index) {
    div += '<div class="card" data-id="' + index + '" data-type="' + data + '">' + data + '</div>'
  });

  this.$el.html(div);
};

/**
 * カード単体毎のセレクタをメンバ変数$cardにセットする
 */
CardUi.prototype.setCardSelector = function () {
  this.$card = this.$el.find('.card');
};

/**
 * カードを非表示にする
 */
CardUi.prototype.hide = function () {
  this.$card.hide();
};

/**
 * カードを表示する
 */
CardUi.prototype.show = function () {
  var promise = $.Deferred();
  var count = 0;

  this.$card.each(function (index) {
    velocity($(this), {
      scale: [1, 0],
    }, {
      easing: [.18, 1.25, .68, 1.17],
      display: 'block',
      delay: 30 * index,
      complete: function () {
        count += 1;

        if (count === index + 1) {
          promise.resolve();
        }
      }
    });
  });

  return promise;
};

/**
 * 引数idのデータ属性を持ったカードをめくる
 * @param {String} id めくりたいカードのデータ属性
 */
CardUi.prototype.flip = function (id) {
  this.$card
    .closest('[data-id="' + id + '"]')
    .addClass('flipped');
};

/**
 * 引数idsのデータ属性を持ったカードを伏せる
 * @param {Array} ids 伏せたいカードのデータ属性
 */
CardUi.prototype.flipDown = function (ids) {
  var self = this;

  ids.forEach(function (id) {
    self.$card
      .closest('[data-id="' + id + '"]')
      .removeClass('flipped');
  });
};

/**
 * メンバ変数disableを更新
 * @param {Boolean} boolean
 */
CardUi.prototype.updateDisable = function (boolean) {
  this.disable = boolean;
};

/**
 * 引数$cardのセレクタはすでにめくっているかどうか
 * @param {Object} $card クリックしたカードのセレクタ
 */
CardUi.prototype.hasFlipped = function ($card) {
  return $card.hasClass('flipped') ? true : false;
};

/**
 * イベントをバインド
 */
CardUi.prototype.bind = function () {
  var self = this;
  var $this;
  var cardId;
  var cardType;

  this.$card.on('click', function () {
    $this = $(this);

    if (self.disable || self.hasFlipped($this)) {
      return;
    }

    cardId = $this.attr('data-id');
    cardType = $this.attr('data-type');

    self.flip(cardId);
    self.emitter.emit('flip.CardUi', cardId, cardType);
  });
}

module.exports = CardUi;