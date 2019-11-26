<template>
  <div class="book-item">
    <p>{{ book.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'BookListItem',
  props: ['book']
};
</script>
