<template>
	<div class="side-bar" :class="{'side-bar--active': open}">
		<div class="side-bar__menu">
			<div class="side-bar__heading">
				<main-heading
					:text="'Wantlist'"
					:color="'white'"
					:className="'gamma'"
					:class="{'side-bar__heading-item': listType === 'wantlist'}"
					@click="handleClick('wantlist')"
				>
				</main-heading>
				<main-heading
					:text="'Favourites'"
					:color="'white'"
					:className="'gamma'"
					:class="{'side-bar__heading-item': listType === 'favourites'}"
					@click="handleClick('favourites')"
				>
				</main-heading>
				<close-button
					:color="'white'"
					@closeClick="handleCloseBar"
				>
				</close-button>
			</div>
			<scrolling-container class="side-bar__wantlist" id="side-bar">
				<wantlist v-if="listType === 'wantlist'"></wantlist>
			</scrolling-container>
		</div>
	</div>
</template>

<script>
import MainHeading from '@/js/atomic/main-heading';
import CloseButton from '@/js/atomic/close-button';
import ScrollingContainer from '@/js/atomic/scrolling-container';
import SwiperParent from '@/js/atomic/swiper-parent';
import Wantlist from '@/js/components/wantlist';
import {watch} from '@/js/helpers/dismiss-modal';
import {mapActions, mapState} from 'vuex';
export default {
    name: 'SideBar',
    components: {
        MainHeading,
        CloseButton,
        ScrollingContainer,
        Wantlist,
        SwiperParent
    },
    data() {
        return {
            listType: 'wantlist',
            showList: false
        };
    },
    computed: {
        ...mapState({
            open: state => state.ui.menu
        })
    },
    methods: {
        ...mapActions(['TOGGLE_MENU']),
        handleCloseBar() {
            this.TOGGLE_MENU(false);
        },
        handleClick(value) {
            this.listType = value;
        }
    },
    watch: {
        open: function(val) {
            if (val) {
                watch('#side-bar', () => {
                    this.handleCloseBar();
                });
            }
        }
    }
};
</script>

<style lang="scss" type="text/scss">
.side-bar {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s;
    transition-delay: 1s;
    &--active {
        transition-delay: 0s;
        opacity: 1;
        pointer-events: all;
    }
    &__menu {
        position: relative;
        width: em(320);
        height: 100%;
        //background: linear-gradient(to bottom, $secondaryColour 0%, darken( $secondaryColour, 15% ) 100%);
        background: linear-gradient(to bottom, $primaryColour 0%, darken($primaryColour, 30%) 100%);
        z-index: 3;
        display: flex;
        flex-direction: column;
        pointer-events: all;
    }
    &__heading {
        flex: 0 0 88px;
        padding: em(16);
        height: em(88);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__wantlist {
        background: linear-gradient(to bottom, $secondaryColour 0%, darken($secondaryColour, 15%) 100%);
        flex: 1 1 100%;
    }
}
</style>
