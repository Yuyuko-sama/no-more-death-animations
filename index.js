"use strict";
const Command = require("command");
const dataMap = new WeakMap;

function cmdHandler() {
  this.cmd.message(`Death animations ${
    (this.settings.enabled = !this.settings.enabled) ? "ena" : "disa"
  }bled`);
}

function removeAnimation(evt) {
  if (!dataMap.get(this).enabled || evt.type !== 5) return;
  evt.type = 1;
  return true;
}

function NoMoreDeathAnimations(_) {
  const cmd = Command(_);
  const settings = { enabled: true };

  cmd.add("deathanimations", cmdHandler, { cmd, settings });

  dataMap.set(_.hook("S_DESPAWN_NPC", 3, removeAnimation), settings);
}

module.exports = NoMoreDeathAnimations;
