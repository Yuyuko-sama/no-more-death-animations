"use strict";
const Command = require("command");

function cmdHandler() {
  if (this.enabled) {
    this.hook = void this.dispatch.unhook(this.hook);
  }
  else {
    this.hook = this.dispatch.hook("S_DESPAWN_NPC", 3, removeAnimation);
  }
  this.cmd.message(`Death animations ${
    (this.enabled = !this.enabled) ? "ena" : "disa"
  }bled`);
}

function removeAnimation(evt) {
  if (evt.type !== 5) return;
  evt.type = 1;
  return true;
}

function NoMoreDeathAnimations(_) {
  const cmd = this.cmd = Command(_);
  this.enabled = true;
  this.dispatch = _;

  cmd.add("deathanimations", cmdHandler, this);

  this.hook = _.hook("S_DESPAWN_NPC", 3, removeAnimation);
}

module.exports = NoMoreDeathAnimations;
