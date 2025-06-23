import React, {useState} from "react";
import "./css/PopUpOferta.css";
import {Button, Input, Modal, Space, Tooltip} from "antd";
import {
    EmailIcon,
    EmailShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon
} from "react-share";
import {CopyOutlined} from "@ant-design/icons";

export default function ModalConviteEmpresa(props) {
    const [copiado, setCopiado] = useState('Copiar Link')
    const [isOpen, setIsOpen] = useState(false)
    const profissional = props.profissional;
    const texto = 'Estou te convidando para sermos parceiros Wed Digital 💜\n' +
        '\n' +
        'Toque no link agora e cadastre-se para juntos fecharmos novos contratos: '
    const url = `https://weddigital.com.br/empresas?convite=${profissional.idProfissional}`;
    const handleCopy = () => {
        navigator.clipboard.writeText(texto + url + ' \nVamos crescer juntos!').then(() => {
            setCopiado('Link Copiado')
            setIsOpen(true)
            setInterval(() => {
                setCopiado('Copiar Link')
                setIsOpen(false)
            }, 2000)
        });

    }
    const sizeIcon = window.innerWidth < 500 ? 35 : 64
    const title = '🚨 Sua empresa entre os destaques do universo dos casamentos! 🌟';
    return (
        <Modal title='Convide seus parceiros para a Wed Digital' open={props.isOpen}
               footer={null}
               width={600}
               centered
               onCancel={props.handleClose}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-evenly',
                width: "100%",
                resize: "none"
            }}>
                <p>
                    <WhatsappShareButton url={url} title={texto}><WhatsappIcon
                        round size={sizeIcon}/></WhatsappShareButton>
                </p>
                <p><EmailShareButton url={url}
                                     subject={title}
                                     body={texto}><EmailIcon round size={sizeIcon}/></EmailShareButton></p>
                <p>
                    <TelegramShareButton url={url}
                                         title={texto}><TelegramIcon round size={sizeIcon}/></TelegramShareButton>
                </p>
                <p>
                    <TwitterShareButton url={url} title={texto}><XIcon round size={sizeIcon}/> </TwitterShareButton>
                </p>
                <p>
                    <PinterestShareButton url={url}
                                          description={texto}
                                          media={'https://weddigital.com.br/static/media/logo-weddigital.0645902689ed62a4fbd5.png'}><PinterestIcon
                        round size={sizeIcon}/></PinterestShareButton>
                </p>
                <p>
                    <LinkedinShareButton url={url} title={title} summary={texto} source={url}><LinkedinIcon round
                                                                                                            size={sizeIcon}/></LinkedinShareButton>
                </p>
                {/*<p>*/}
                {/*    <FacebookShareButton url={url} hashtag={texto}><FacebookIcon round*/}
                {/*                                                                 size={sizeIcon}/></FacebookShareButton>*/}
                {/*</p>*/}
                <p>
                    <TumblrShareButton url={url} title={title} caption={texto}><TumblrIcon round
                                                                                           size={sizeIcon}/></TumblrShareButton>
                </p>
                <p>
                    <RedditShareButton url={url} title={texto}><RedditIcon round size={sizeIcon}/> </RedditShareButton>
                </p>
                {/*<p>*/}
                {/*    <FacebookMessengerShareButton url={url} appId={''}><FacebookMessengerIcon*/}
                {/*        round size={sizeIcon}/></FacebookMessengerShareButton>*/}
                {/*</p>*/}
            </div>
            <Space.Compact style={{width: '100%'}}>
                <Input size='middle' prefix={<CopyOutlined/>} disabled={true} value={url}/>
                <Tooltip title='Agora envie para o seu parceiro' open={isOpen} placement='bottom'>
                    <Button onClick={handleCopy}>{copiado}</Button>
                </Tooltip>
            </Space.Compact>
            <hr/>
            <div className='text-center'>
                <p>Copie seu link e envie</p>
            </div>
        </Modal>
    );
}
