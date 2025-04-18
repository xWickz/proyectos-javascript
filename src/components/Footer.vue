<template>
    <div
        class="fixed z-50 w-30 h-15 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg mx-auto">

            <div class="flex items-center justify-center">
                <router-link to="/">
                    <button data-tooltip-target="tooltip-new" type="button"
                        class="inline-flex items-center justify-center w-25 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        Volver
                    </button>
                </router-link>
            </div>

        </div>
    </div>
</template>