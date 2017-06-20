var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var GameUi = require('./GameUi');
var Card = require('./Card');
var CardUi = require('./CardUi');
var Count = require('./Count');
var CountUi = require('./CountUi');
var EffectUi = require('./EffectUi');

function Game() {
  this.emitter = emitter;

  this.gameUi = new GameUi(emitter);
  this.card = new Card();
  this.cardUi = new CardUi(emitter);
  this.count = new Count();
  this.countUi = new CountUi();
  this.effectUi = new EffectUi();

  this.cardType = [];
  this.cardId = [];

  this.onStartGameUi = this.onStartGameUi.bind(this);
  this.onFlipCardUi = this.onFlipCardUi.bind(this);
  this.onEndJudge = this.onEndJudge.bind(this);
}

Game.prototype.initialize = function () {
  this.setUp();
  this.bind();
};

Game.prototype.setUp = function () {
  var cardNumber = 12;

  this.gameUi.initialize();
  this.gameUi.bind();

  this.card.shuffle(cardNumber);
  this.cardUi.render(this.card.getShuffled());
  this.cardUi.setCardSelector();
  this.cardUi.hide();
  this.cardUi.bind();

  this.countUi.set(this.count.get());
  this.countUi.hide();
};

Game.prototype.bind = function () {
  this.emitter.on('clickStart.GameUi', this.onStartGameUi);
  this.emitter.on('flip.CardUi', this.onFlipCardUi);
  this.emitter.on('endJudge', this.onEndJudge);
};

Game.prototype.onStartGameUi = function () {
  this.start();
}

Game.prototype.onFlipCardUi = function (cardId, cardType) {
  this.cardId.push(cardId);
  this.cardType.push(cardType);

  if (this.cardType.length === 2) {
    this.cardUi.updateDisable(true);

    if (this.judge()) {
      this.correct();
    } else {
      this.inCorrect();
    }
  }
};

Game.prototype.onEndJudge = function (isCorrect) {
  if (!isCorrect) {
    this.cardUi.flipDown(this.cardId);
  }

  this.cardId = [];
  this.cardType = [];
  this.count.reduce();
  this.countUi.update(this.count.get());

  if (this.canContinue()) {
    this.cardUi.updateDisable(false);
  } else {
    this.cardUi.updateDisable(true);
  }
};

Game.prototype.start = function () {
  this.countUi.show = this.countUi.show.bind(this.countUi);

  this.gameUi.hideOpening();
  this.gameUi.showPlay();
  this.cardUi.show()
    .then(this.countUi.show);
};

Game.prototype.judge = function () {
  if (this.cardType[0] === this.cardType[1]) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.correct = function () {
  var self = this;

  this.effectUi.good().then(function () {
    self.emitter.emit('endJudge', true);
  });
};

Game.prototype.inCorrect = function () {
  var self = this;

  this.effectUi.bad().then(function () {
    self.emitter.emit('endJudge', false);
  });
};

Game.prototype.canContinue = function () {
  return (this.count.get() === 0) ? false : true;
};

module.exports = Game;
