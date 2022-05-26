import { useState, useEffect, useRef } from 'react';


function randomColor(currentColor) {
    const listColor = ['red', 'pink', 'blue']

    const indexColor = listColor.indexOf(currentColor);

    let newIndex = indexColor;

    while (newIndex === indexColor) {
        newIndex = Math.trunc(Math.random() * 3);
    }
    return listColor[newIndex];
}
function useMagicColor() {
    const [color, setColor] = useState('transparent')
    const colorRef = useRef('transparent')

    //Change color every 1 second
    useEffect(() => {
        const colorInterval = setInterval(() => {
            const newColor = randomColor(colorRef.current);
            setColor(newColor)

            colorRef.current = newColor;
        }, 1000);

        return () => {
            console.log('cleaup');
            clearInterval(colorInterval);
        }
    }, [])


    return color
}

export default useMagicColor;