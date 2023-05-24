import { Link } from "react-router-dom";
import { Envelope, Lock } from "@phosphor-icons/react";
import { FormEvent } from "react";
import Heading from "../Heading";
import logo from "../../assets/logo.svg";
import Text from "../Text";
import { TextInput } from "../TextInput";
import Button from "../Button";

interface AuthFormElements extends HTMLFormControlsCollection {
    user: HTMLInputElement;
    password: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
    readonly elements: AuthFormElements;
}

export interface Auth {
    user: string;
    name?: string;
    password: string;
}

interface AuthFormProps {
    authFormTitle: string;
    submitFormButtonText: string;
    routeName: string;
    submitFormButtonAction: (auth: Auth) => void;
}

function AuthForm(props: AuthFormProps) {
    function handleSubmit(event: FormEvent<AuthFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;

        const auth = {
            user: form.elements.user.value,
            password: form.elements.password.value,
        };

        props.submitFormButtonAction(auth);
    }
    return (
        <div className="flex flex-col items items-center mt-16">
            <header className="flex flex-col items-center">
                <img src={logo} alt="Logo Sysmap" />

                <Heading size="lg" className="mt-4">Sysmap Parrot</Heading>
                <Text className="mt-2 opacity-50">
                    {props.authFormTitle}
                </Text>
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-4 w-full max-w-sm mt-12">
                <Text>Endereço de e-mail</Text>
                <TextInput.Root>
                    <TextInput.Icon>
                        <Envelope size={32} />
                    </TextInput.Icon>
                    <TextInput.Input id="user" placeholder="Digite seu e-mail" type="text"></TextInput.Input>
                </TextInput.Root>
                <Text>Senha</Text>
                <TextInput.Root>
                    <TextInput.Icon>
                        <Lock size={32} />
                    </TextInput.Icon>
                    <TextInput.Input id="password" placeholder="*******" type="password"></TextInput.Input>
                </TextInput.Root>
                <Button type="submit" className="mt-6">{props.submitFormButtonText}</Button>
            </form>
            <footer className="flex flex-col items-center gap-4 mt-6">
                <Text asChild size="sm">
                    <Link to={props.routeName} className="text-gray-400 underline hover: text-gray-200">Não possui conta? Crie uma agora!</Link>
                </Text>
            </footer>
        </div>
    )
}

export default AuthForm;