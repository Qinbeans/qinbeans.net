<script lang="ts">
    import Card from '$lib/components/card.svelte';
	import type { ContactFormData } from '$lib/scripts/types';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

    const formData: ContactFormData = {
        name: '',
        email: '',
        message: ''
    }

    const alertToast = getToastStore();

    let alertSetting: ToastSettings;

    let txtarea: HTMLTextAreaElement;

    const submit = async () => {
        alertToast.clear();
        // send json to /api/contact
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        // reset form
        formData.name = '';
        formData.email = '';
        formData.message = '';
        txtarea.style.height = '25px';
        // set alert
        if (data.error){
            alertSetting = {
                message: "There was an error sending your message: " + data.error,
                background: "variant-filled-error",
                timeout: 5000
            }
        } else {
            alertSetting = {
                message: 'Your message has been sent! I will get back to you as soon as possible.',
                background: "variant-filled-success",
                timeout: 5000
            } 
        }
        alertToast.trigger(alertSetting);
    }
    // resizes textarea dynamically based on content, if it's too big, it will scroll
    const check_dyn_resize = () => {
        txtarea.style.height = '5px';
        txtarea.style.height = txtarea.scrollHeight + 1 + 'px';
    }

</script>
<Toast/>
<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    <Card title="Contact" title_class="text-3xl" inner_padding="px-[7%] py-4" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="" inner_width="w-full" enable_image={false}>
        <p class="py-2 text-center">You can contact me through these methods:</p>
        <ul class="w-full text-center">
            <li class="flex flex-row gap-3 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-black">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <a href="mailto:rfong3488@gmail.com" class="text-gray-200">rfong3488@gmail.com</a>
            </li>
            <li class="flex flex-row gap-3 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-black">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href="tel:1-650-339-9223" class="text-gray-200">(650)339-9223</a>
            </li>
        </ul>
    </Card>
    <Card title="Contact Form" title_class="text-3xl" inner_padding="px-[7%] py-4" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="" inner_width="w-full" enable_image={false}>
        <p class="py-2 text-center">You can also submit a ticket</p>
        <form id="contact" class="flex flex-col" on:submit={submit}>
            <label for="name" class="text-gray-200">Name</label>
            <input bind:value={formData.name} type="text" width=100% name="name" id="name" class="mb-2 bg-transparent border-b border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none"/>
            <label for="email" class="text-gray-200">Email</label>
            <input bind:value={formData.email} type="email" name="email" id="email" class="mb-2 bg-transparent border-b border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none"/>
            <label for="message" class="text-gray-200">Message</label>
            <textarea bind:this={txtarea} bind:value={formData.message} on:input={check_dyn_resize} name="message" id="message" class="mb-2 bg-transparent border-b border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none"></textarea>
            <button type="submit" class="bg-transparent border border-gray-200 hover:bg-gray-200 hover:text-black focus:ring-0 focus:outline-none">Submit</button>
        </form>
    </Card>
    <Card title="Chatroom" title_class="text-3xl" inner_padding="px-[15%] py-4" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="w-full" inner_width="w-full" enable_image={false}>
        <p class="py-2 line-through text-center">if you want to chat with me right now, you can join my chatroom</p>
        <p class="text-gray-200 text-center">This feature is currently under development</p>
    </Card>
</div>

<style>
    textarea {
        resize: none;
        height: 25px;
        min-height: 25px;
        max-height: 150px;
    }
    
    p {
        @apply text-xs;
    }
    h2 {
        @apply text-xl;
    }
    h3 {
        @apply text-lg;
    }
</style>