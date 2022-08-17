<script lang="ts">
    import { Box } from "../chakra-ui-svelte"
</script>

<div class="f-height">
    <Box textAlign="center" class="center-rel center-v tighten" bg="whiteAlpha.600" padding="1.5" borderRadius="10">
        <label for="email">Contact</label>
        <input type="email" placeholder="someone@example.com">
        <br/>
        <label for="message">Content</label>
        <textarea name="content" id="content" cols="20" rows="10"></textarea>
        <br/>
        <label for="human">I Am Human</label>
        <input type="checkbox" name="human" id="human" value="human">
        <Box fontSize="md" padding="1.5" class="center-rel tighten point" bg="blackAlpha.500" borderRadius="10">Submit</Box>
    </Box>
</div>