<template>
  <div class="comment" v-if="comment">
    <small>By @{{ comment.user }}</small>
    <blockquote>
      {{ comment.content }}
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment']
};
</script>
