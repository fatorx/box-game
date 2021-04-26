
export default function randNumber(num) {
    /**
     * Atualizar geração de número randômico, conforme suporte de navegadores.
     */

    let min = Math.ceil(0);
    let max = Math.floor(3);
    let randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (randNumber === num) {
        randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randNumber;
}
