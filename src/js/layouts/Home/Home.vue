<template>
  <div class="hello__wrap">
    <div class="hello__header">
      <h1 
        class="alpha" 
        data-test="title">{{ title }}</h1>
      <h2 
        class="beta" 
        data-test="subtitle">{{ subtitle }}</h2>
    </div>
    <div class="hello__content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget placerat ipsum, id convallis arcu. Nam sapien eros, fermentum vitae aliquam ut, hendrerit rutrum massa. Nunc pellentesque mi turpis, et tempus ex sollicitudin a. Proin nisl ante, tempus sit amet pharetra aliquet, aliquam ac lectus. Vestibulum eu eros sed risus varius aliquet. Vivamus efficitur eros risus, a sollicitudin arcu porta eget. Vestibulum imperdiet odio urna, vitae euismod mi hendrerit in. Nam augue augue, accumsan vitae eros sit amet, aliquam interdum nisi. Cras est turpis, faucibus quis purus sit amet, dictum laoreet mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ultricies rhoncus erat egestas accumsan.</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        title: {
            type: String,
            required: false,
            default: 'Hello world'
        },
        subtitle: {
            type: String,
            required: false,
            default: 'This is a subtitle'
        }
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
$module: 'hello';

.#{$module} {
    &__wrap {
        width: em(900);
        max-width: 100%;
        margin: 0 auto;
    }

    &__header {
        padding: rem(10);
        background-color: rgba(black, 0.1);
        margin-bottom: rem(10);

        @include mqMax(m) {
            font-size: em($fzBase * 0.5);

            &:after {
                content: 'Everything inside is now 50% the size it was';
                font-size: rem($fzBase);
            }
        }
    }

    &__content {
        padding: rem(10);
        background-color: rgba(black, 0.1);
    }
}
</style>
