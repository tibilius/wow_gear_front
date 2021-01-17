export default {
    state: {
        dungeon: [
            {fullName: "Mists of Tirna Scithe", name: "MOTS", checked:false, image: require('@/assets/wow_dungeons/shl/mots.webp')},
            {fullName: "The Necrotic Wake", name: "NW", checked:false, image: require('@/assets/wow_dungeons/shl/nw.webp')},
            {fullName: "De Other Side", name: "DOS", checked:false, image: require('@/assets/wow_dungeons/shl/dos.webp')},
            {fullName: "Halls of Atonement", name: "HOA", checked:false, image: require('@/assets/wow_dungeons/shl/hoa.webp')},
            {fullName: "Plaguefall", name: "PF", checked:false, image: require('@/assets/wow_dungeons/shl/pf.webp')},
            {fullName: "Sanguine Depths", name: "SD", checked:false, image: require('@/assets/wow_dungeons/shl/sd.webp')},
            {fullName: "Spires of Ascension", name: "SOA", checked:false, image: require('@/assets/wow_dungeons/shl/soa.webp')},
            {fullName: "Theater of Pain", name: "TOP", checked:false, image: require('@/assets/wow_dungeons/shl/top.webp')}
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