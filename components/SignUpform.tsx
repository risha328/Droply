"use client"

import {useForm} from "react-hook-form"
import { useSignUp } from "@clerk/nextjs"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

import { signUpSchema } from "@/schemas/signUpSchema"
import React, { useState } from "react"

export default function SignUpForm(){
    const [verifying, setVerifying] = useState(false)
    const {signUp, isLoaded, setActive} = useSignUp();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [authError, setAuthError] = useState<string | null>(null)
    const{
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues:{
            email:"",
            password:"",
            passwordConfirmation: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof signUpSchema>)  => {
        if(!isLoaded)
            return;
        setIsSubmitting(true);
        setAuthError(null);

        try{
            signUp.create({
                emailAddress:data.email,
                password:data.password,
            })
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })
            setVerifying(true);
        }catch(error: any){
           console.error("Signup error:", error)
           setAuthError(
            error.errors[0].message || "Something went wrong"
           );
        } finally{
            setIsSubmitting(false);
        }
    };

    const handleVerificationSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!isLoaded || !signUp)
            return;
        setIsSubmitting(true);
        setAuthError(null);

        try{
            await signUp.attemptEmailAddressVerification({code: verificationCode});
        }catch(error:any) {
            console.error("Verification Error",error)
            setAuthError(
                error.errors[0].message || "Something went wrong"
            )
        }
    }

    if(verifying)
    {
        return(
            <h1>this is OTP entering field</h1>
        )
    }

    return(
        <h1>SignUp form with email and other fields</h1>
    )


}