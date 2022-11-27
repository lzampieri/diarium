module.exports = {
    palette: {
        transparent: 'transparent',
        current: 'currentColor',
        halfblack: '#000000aa',
        black: '#000000',
        white: '#ffffff',
        grey: '#d3d3d3',
        bordersGrey: '#d3d3d3',
        red: '#ED4337',
        text: { main: '#000000' }
    },
    typography: {
        fontFamily: '"Quattrocento", sans'
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    minHeight: '100px',
                    backgroundColor: '#d3d3d3'
                }
            }
        }
    }
}