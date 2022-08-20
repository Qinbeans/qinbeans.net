<script lang="ts">
    import Markdown from "./markdown.svelte";
</script>

<div class="relative ml-10 mr-10 sm:mb-12 sm:p-2 sm:top-11 mb-15 p-1.5 top-10">
    <div class="text-2xl text-center text-pink-500 underline">Docs</div>
    <Markdown src="/docs/client/contact_form.md" />
    <div class="divider"></div>
    <Markdown src="/docs/admin/admin_form.md" />
    <div class="divider"></div>
    <Markdown src="/docs/admin/blog_form.md" />
</div>