import {
    defineConfig,
    // presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
    transformerCompileClass
} from 'unocss'

// eslint-disable-next-line import/no-named-as-default
import presetRemToPx from '@unocss/preset-rem-to-px'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
    rules: [],
    shortcuts: [
        [
            'container',
            'mx-auto lt-sm:max-w-540 lt-md:max-w-720 lt-lg:max-w-960 lt-xl:max-w-1140 lt-xxl:max-w-1320 xxl:w-1320 px-20'
        ],
        ['flex-center', 'flex justify-center items-center'],
        [
            /^mask-(\d*)$/,
            ([, c]) => `absolute top-0 left-0 w-full h-full bg-blue_dark z-[-1] opacity-${c}`
        ]
        // [
        //   'btn',
        //   'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
        // ],
        // [
        //   'icon-btn',
        //   'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'
        // ]
    ],
    theme: {
        fontFamily: {
            // chenyu: 'ChenYuluoyan',
            // diodrum: 'DiodrumRounded'
        },
        colors: {
            primary: '#646464',
            secondary: '#d83545',
            blue: '#003756',
            blue_dark: '#082c4b',
            blue_light: '#4989a6',
            gray: '#7a7a7a',
            gray_dark: '#474747',
            gray_light: '#c4c4c4',
            brown: '#917b4a',
            brown_dark: '#9c722e',
            brown_light: '#f5dd00'
        },
        breakpoints: {
            'lt-sm': '576.1px',
            'lt-md': '768.1px',
            'lt-lg': '992.1px',
            'lt-xl': '1200.1px',
            'lt-xxl': '1400.1px',
            xxl: '1400px'
        }
    },
    presets: [
        presetUno(),
        // presetAttributify(),
        presetIcons({
            warn: true,
            prefix: ['i-'],
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle'
            },
            collections: {
                me: FileSystemIconLoader('./assets/icons/isme'),
                'my-test': FileSystemIconLoader('./assets/icons', (svg) =>
                    svg.replace(/^<svg /, '<svg fill="#000000" ')
                )
            }
        }),
        presetRemToPx({ baseFontSize: 4 }),
        presetTypography()
    ],
    transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()]
})
