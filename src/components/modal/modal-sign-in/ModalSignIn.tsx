import styles from './ModalSignIn.module.sass'
import { TextSizes, TitleSizes } from 'src/models/common/typography'
import { ModalSignInContent, ModalSignInProps } from 'src/models/modal'
import { Box } from '@mui/system'
import Modal from '../Modal'
import { FC } from 'react'
import Title from '../../common/title/Title'
import NoExtension from './NoExtension'
import NoAccount from './NoAccount'
import Accounts from './Accounts'
import { useAppSelector } from 'src/rtk/app/store'
import { ACCOUNT_STATUS } from 'src/models/auth'
import Link from '../../common/links/link/Link'
import Text from '../../common/text/Text'

const PolkadotLink = () => <Link href={'https://github.com/polkadot-js/extension'} ext className={styles.link}>
    Polkadot Extension
</Link>

const ModalSignIn: FC<ModalSignInProps> = ({
    status,
    isAlert,
    onClose,
    open
}) => {
    const {address, accounts} = useAppSelector(state => state.myAccount)

    const getContent = () => {
        const content: ModalSignInContent = {
            title: null,
            body: null
        }

        if (isAlert) {
            content.title = 'Wait a sec...'

            switch (status) {
                case ACCOUNT_STATUS.EXTENSION_NOT_FOUND:
                    content.body = <NoExtension/>
                    content.text = <>To continue connect with <PolkadotLink />. Enable extension with the button below.</>
                    break
                case ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND:
                    content.body = <NoAccount/>
                    content.text = 'You need to sign in to access this functionality.'
                    break
                case ACCOUNT_STATUS.UNAUTHORIZED:
                    content.body = <Accounts accounts={accounts || []} onClose={onClose}/>
                    content.text = 'You need to sign in to access this functionality. Click on your account below:'
                    break
                default:
                    break
            }

            return content
        }

        content.title = 'Sign in'

        switch (status) {
            case ACCOUNT_STATUS.EXTENSION_NOT_FOUND:
                content.body = <NoExtension/>
                content.text = <><PolkadotLink /> was not found or disabled. Install the extension with the button below.</>
                 break
            case ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND:
                content.body = <NoAccount/>
                break
            case ACCOUNT_STATUS.UNAUTHORIZED:
                content.body = <Accounts accounts={accounts || []} onClose={onClose}/>
                content.text = 'Click on your account to sign in:'
                break
            default:
                break
        }

        return content
    }

    const {text, body, title} = getContent()

    return (
        <Modal
            className={styles.modal}
            onClose={onClose}
            open={open && !address}
        >
            <Box className={styles.box}>
                <Title type={TitleSizes.DETAILS} className={styles.title}>{title}</Title>
                {text && <Text type={TextSizes.NORMAL}>{text}</Text>}
                {body}
            </Box>
        </Modal>
    )
}

export default ModalSignIn
