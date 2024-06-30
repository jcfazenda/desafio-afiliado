export interface UsuarioBot
{
    id: number;
    id_bot?: number;
    id_usuario: number; 

    count_Success: number; 
    count_Idk: number; 
    count_Failure: number; 
    count_Learned: number; 

    fl_ativo: boolean;

    bot: Bot;
} 
 
export interface Bot
{
    id: number;
    id_Status?: number; 

    key_Api_Gpt: string; 
    key_Vonage_Voice: string; 
    icone: string; 
    bot_Nome: string; 
    bot_Descricao: string; 
    bot_Breafing: string; 

    fl_ativo: boolean;
} 