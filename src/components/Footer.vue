<template>
    <div
        class="fixed z-50 w-30 h-15 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg mx-auto">

            <div class="flex items-center justify-center">
                <router-link to="/">
                    <button data-tooltip-target="tooltip-new" type="button"
                        class="gap-1 inline-flex items-center justify-center w-25 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8l-4 4 4 4M16 12H9" />
                        </svg>
                        Volver
                    </button>
                </router-link>
            </div>

        </div>
    </div>
</template>