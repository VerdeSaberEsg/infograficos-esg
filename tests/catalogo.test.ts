import { CATALOGO_CAMPOS, CAMPOS_POR_SECAO } from '../packages/shared/catalogo_campos';

describe('Catálogo de campos', () => {
  it('carrega campos ambientais e sociais', () => {
    expect(Object.keys(CATALOGO_CAMPOS)).toEqual(expect.arrayContaining(['E001', 'S001', 'S030']));
  });

  it('mantém metadados imutáveis', () => {
    const campo = CATALOGO_CAMPOS['E001'];
    expect(campo.titulo).toBe('Número Inscrição CTF');
    expect(campo.tipo).toBe('Direto');
    expect(campo.criterio).toBe('IBAMA dadosabertos API');
  });

  it('organiza campos por seção', () => {
    expect(CAMPOS_POR_SECAO.Ambiental).toHaveLength(19);
    expect(CAMPOS_POR_SECAO.Social).toHaveLength(30);
  });
});
