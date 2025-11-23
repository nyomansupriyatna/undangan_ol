import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, LoaderCircle, house } from 'lucide-react';

export default function ucapanForm({ ...props }) {
    const { ucapan, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Show' : isEdit ? 'Update' : 'Create'} ucapan`,
            href: route('ucapans.create'),
        },
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama: ucapan?.nama || '',
        ucapan: ucapan?.ucapan || '',
        keterangan: ucapan?.keterangan || '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            put(route('ucapans.update', ucapan.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('ucapans.store'), {
                onSuccess: () => reset(),
            });
        }

        // console.log('data', data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="ml-auto">
                <Link
                    as="button"
                    className="text-md flex w-fit cursor-pointer items-center rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                    href={route('ucapans.index')}
                >
                    <ArrowLeftIcon className="me-2" /> Back to ucapans
                </Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {isView ? 'Show' : isEdit ? 'Update' : 'Create'}{' '}
                            ucapan
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-4"
                            autoComplete="off"
                        >
                            <div className="grid gap-6">
                                {/* Nama ucapan */}
                                <div className="grid gap-2">
                                    <Label htmlFor="ucapan">
                                        Nama 
                                    </Label>
                                    <Input
                                        value={data.nama}
                                        onChange={(e) =>
                                            setData('nama', e.target.value,)}
                                        id="nama"
                                        name="nama"
                                        type="text"
                                        placeholder="Nama"
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />

                                    <InputError message={errors.nama} />
                                </div>

                                {/* Alamat ucapan */}
                                <div className="grid gap-2">
                                    <Label htmlFor="ucapan">
                                        Ucapan / Doa
                                    </Label>

                                    <CustomTextarea
                                        value={data.ucapan}
                                        onChange={(e) =>
                                            setData('ucapan',e.target.value,)}
                                        id="ucapan"
                                        name="ucapan"
                                        placeholder="Ucapan"
                                        autoFocus
                                        rows={4}
                                        tabIndex={2}
                                        disabled={isView || processing}
                                    />
                                    <InputError
                                        message={errors.ucapan}
                                    />
                                </div>

                                {/* Phone ucapan */}
                                <div className="grid gap-2">
                                    <Label htmlFor="keterangan">
                                        Keterangann
                                    </Label>
                                    <Input
                                        value={data.keterangan}
                                        onChange={(e) =>
                                            setData('keterangan',e.target.value,)}
                                        id="keterangan"
                                        name="keterangan"
                                        type="text"
                                        placeholder="Keterangan"
                                        autoFocus
                                        tabIndex={3}
                                        disabled={isView || processing}
                                    />
                                    <InputError
                                        message={errors.keterangan}
                                    />
                                </div>

                                {!isView && (
                                    <Button
                                        type="submit"
                                        className="mt-4 w-fit cursor-pointer"
                                        tabIndex={5}
                                    >
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                        )}
                                        {processing
                                            ? isEdit
                                                ? 'Updating...'
                                                : 'Creating...'
                                            : isEdit
                                              ? 'Update'
                                              : 'Create'}{' '}
                                        ucapan
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
