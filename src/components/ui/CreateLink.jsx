import { urlState } from '@/context'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './button'
import { Input } from './input'
import Error from '../Error'
import { Card } from './card'
import * as yup from "yup"
import useFetch from '@/hooks/useFetch'
import QRCode from 'react-qrcode-logo'
import { useRef } from 'react'
import { createUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'

const CreateLink = () => {
    const { user } = urlState()
    const navigate = useNavigate()

    let [searchParms, setSearchParams] = useSearchParams()
    const longLink = searchParms.get("createNew")

    const [errors, setErrors] = useState('');
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };
    const ref = useRef()

    const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, { ...formValues, user_id: user.id })

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data]);

    const createNewLink = async () => {
        setErrors([])
        try {
            await schema.validate(formValues, { abortEarly: false })
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve))
            await fnCreateUrl(blob);
        } catch (error) {

        }
    }
    return (

        <Dialog defaultOpen={longLink} onOpenChange={(res) => { if (!res) setSearchParams({}) }}>
            <DialogTrigger>
                <Button variant="destructive">
                    Create New Link
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                </DialogHeader>
                <Input id="title" placeholder="Short link's title" value={formValues.title} onChange={handleChange} />
                {errors.title && <Error message={errors.title} />}
                <Input id="longUrl" placeholder="Enter long URL" value={formValues.longUrl} onChange={handleChange} />
                {errors.longUrl && <Error message={errors.longUrl} />}
                <div className='flex items-center gap-2'>
                    <Card className="p-2">shrink.com</Card>/
                    <Input id="customUrl" placeholder="Custom link (optional)" value={formValues.customUrl} onChange={handleChange} />
                </div>
                {errors.message && <Error message={errors.message} />}

                {formValues?.longUrl && <QRCode value='formValues?.longUrl' size={250} ref={ref} />}
                <DialogFooter className="sm:justify-start">
                    <Button disabled={loading} onClick={createNewLink} variant="destructive" cursor="pointer">
                        {loading ? <BeatLoader size={10} color='white' /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateLink