/*devServer:{
    host:'0.0.0.0';
   port:8888;
   proxy:{
       '/api',{
           target:`http://127.0.0.1:8888/api/private/v1/`,
           changeOrigin:true,
           pathReWrite:{
               '^api':''
           }
       }
   }
} */

exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8888/api/private/v1/',
                ws: true,

                changeOrigin: true,
                pathReWrite: {
                    '^/api': ''
                }
            }
        }

    }
}