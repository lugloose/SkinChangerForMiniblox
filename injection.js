// SKIN
	addReplacement('
			hud3D.remove(hud3D.rightArm);
			hud3D.rightArm = undefined;
			player$1.profile.cosmetics.skin = "PurpleFade";
			$.cosmetics.skin = "PurpleFade";
			$.cosmetics.cape = "PurpleFade";
		}
	`);
	addReplacement('bob:{id:"bob",name:"Bob",tier:0,skinny:!1},', 'PurpleFade:{id:"PurpleFade",name:"PurpleFade",tier:2,skinny:!1},');
	addReplacement('cloud:{id:"cloud",name:"Cloud",tier:2},', 'PurpleFade:{id:"PurpleFade",name:"PurpleFade",tier:2},');
	addReplacement('async downloadSkin(_){', `
		if (_ == "PurpleFade") {
			const $ = skins[_];
			return new Promise((et, tt) => {
				textureManager.loader.load("https://raw.githubusercontent.com/lugloose/SkinChangerForMiniblox/main/assets/skin.png", rt => {
					const nt = {
						atlas: rt,
						id: _,
						skinny: $.skinny,
						ratio: rt.image.width / 64
					};
					SkinManager.createAtlasMat(nt), this.skins[_] = nt, et();
				}, void 0, function(rt) {
					console.error(rt), et();
				});
			});
		}
	`);
	addReplacement('async downloadCape(_){', `
		if (_ == "PurpleFade") {
			const $ = capes[_];
			return new Promise((et, tt) => {
				textureManager.loader.load("https://raw.githubusercontent.com/lugloose/SkinChangerForMiniblox/main/assets/capetest.png", rt => {
					const nt = {
						atlas: rt,
						id: _,
						name: $.name,
						ratio: rt.image.width / 64,
						rankLevel: $.tier,
						isCape: !0
					};
					SkinManager.createAtlasMat(nt), this.capes[_] = nt, et();
				}, void 0, function(rt) {
					console.error(rt), et();
				});
			});
		}
	`);
