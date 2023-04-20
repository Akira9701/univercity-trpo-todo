const config = {
    root: './src/',
    base: './',
    build: {
        outDir: '../dist',
        assetsInlineLimit: 0,
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              let extType = assetInfo.name.split('.').at(1);
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                extType = 'images';
              }
              else if (/css/i.test(extType)) {
                extType = 'styles';
              }
              return `assets/${extType}/[name][extname]`;
            },
            chunkFileNames: 'assets/scripts/[name]-[hash].js',
            entryFileNames: 'assets/scripts/[name]-[hash].js',
          },
        },

    }
}

export default config;