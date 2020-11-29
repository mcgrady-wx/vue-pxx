<template>
    <div class="me">
        <div v-if="userInfo.id">
            <MeTop />
        </div>
        <select-login v-else/>
    </div>
</template>

<script>
import SelectLogin from '../Login/SelectLogin'
import {mapState} from 'vuex'
import MeTop from './MeTop'
export default {
    computed:{
        ...mapState(['userInfo'])
    },
    components:{
        SelectLogin,
        MeTop
    }
}
</script>

<style lang="stylus" scoped>

</style>