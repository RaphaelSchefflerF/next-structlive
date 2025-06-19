'use client';

// Importando os componentes de desafios específicos para cada tipo de lista
import LcChallenge from '../types/lc/challenge';
import LddeChallenge from '../types/ldde/challenge';
import LdseChallenge from '../types/ldse/challenge';
import LeeChallenge from '../types/lee/challenge';
import LesChallenge from '../types/les/challenge';

type Props = {
    tipo: string;
};

export default function ListChallenge({ tipo }: Props) {
    switch (tipo) {
        case 'lc':
            return <LcChallenge />;
        case 'ldde':
            return <LddeChallenge />;
        case 'ldse':
            return <LdseChallenge />;
        case 'lee':
            return <LeeChallenge />;
        case 'les':
            return <LesChallenge />;
        default:
            return (
                <div>
                    Selecione um tipo de lista para ver o conteúdo teórico.
                </div>
            );
    }
}
