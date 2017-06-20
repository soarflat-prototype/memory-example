/**
 * カードのモデルを管理するクラス
 */
function Card() {
  this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  this.shuffled = [];
}

/**
 *　カードデータをシャッフルし、引数に応じたインデックスの長さのデータを抜き出し、メンバ変数shuffledに格納する
 * @param {number} cardNumber カードの合計枚数
 */
Card.prototype.shuffle = function (cardNumber) {
  var shuffled = _.shuffle(this.data).slice(0, cardNumber / 2);
  var concatenated = _.concat(shuffled, shuffled);

  this.shuffled = _.shuffle(concatenated);
};

/**
 *　シャッフルしたカードのデータを返す
 * @return {Array} shuffled シャッフルしたカードのデータ
 */
Card.prototype.getShuffled = function () {
  return this.shuffled;
}

module.exports = Card;
