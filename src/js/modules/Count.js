/**
 * 残り回数のモデルを管理するクラス
 */
function Count() {
  this.count = 10;
}

/**
 * 残り回数を減らす
 */
Count.prototype.reduce = function () {
  this.count -= 1;
};

/**
 * 残り回数を返す
 */
Count.prototype.get = function () {
  return this.count;
};

module.exports = Count;
