"use strict";

module.exports = function DeathAnimation(mod) {
let enabled = true,

	mod.hook("S_DESPAWN_NPC", 3,  event => {
		if (event.type !== 5 && enabled) return
		event.type = 1
		return true
	}
	mod.command.add('deathanimation', {
        $none() {
            enabled = !enabled;
            mod.command.message(`death animations ${enabled ? 'en' : 'dis'}abled`)
        }
    })
}