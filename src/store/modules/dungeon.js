export default {
    state: {
        dungeon: [
            {fullName: "Atal'Dazar", name: "AD", image: require('@/assets/wow_dungeons/ad.webp'), checked: false},
            {fullName: "Freehold", name: "FH", image: require('@/assets/wow_dungeons/fh.webp'), checked: false},
            {fullName: "Kings' Rest", name: "KR", image: require('@/assets/wow_dungeons/kr.webp'), checked: false},
            {fullName: "Waycrest Manor", name: "WM", image: require('@/assets/wow_dungeons/wm.webp'), checked: false},
            {fullName: "Tol Dagor", name: "TD", image: require('@/assets/wow_dungeons/td.webp'), checked: false},
            {
                fullName: "Siege of Boralus",
                name: "SOB",
                image: require('@/assets/wow_dungeons/sob.webp'),
                checked: false
            },
            {fullName: "The Underrot", name: "TUR", image: require('@/assets/wow_dungeons/tur.webp'), checked: false},
            {
                fullName: "The MOTHERLODE!!",
                name: "TML",
                image: require('@/assets/wow_dungeons/tml.webp'),
                checked: false
            },
            {
                fullName: "Operation: Mechagon - Junkyard",
                name: "OPMJ",
                image: require('@/assets/wow_dungeons/opmj.webp'),
                checked: false
            },
            {
                fullName: "Temple of Sethraliss",
                name: "TOSL",
                image: require('@/assets/wow_dungeons/tosl.webp'),
                checked: false
            },
            {
                fullName: "Shrine of the Storm",
                name: "SOTS",
                image: require('@/assets/wow_dungeons/sots.webp'),
                checked: false
            },
            {
                fullName: "Ny'alotha, the Waking City",
                name: "NYA",
                image: require('@/assets/wow_dungeons/nya.webp'),
                checked: true
            },
            {
                fullName: "Vision of Orgrimmar/Stormwind-City",
                name: "VIS",
                image: require('@/assets/wow_dungeons/vision.webp'),
                checked: true
            },
        ],
    },
    mutations: {
        updateDungeon(state, dungeon) {
            state.dungeon = dungeon
        },
        updateSelectedDungeon(state, dungeon) {
            state.dungeon.forEach(p => p.checked = dungeon.indexOf(p.name) !== -1)
        },
    },
    getters: {
        getDungeon(state) {
            return state.dungeon
        },
        getSelectedDungeon(state) {
            return state.dungeon.filter(p => p.checked).map(p => p.name)
        },
    }
}