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

export default function ProfileForm({ ...props }) {
    const { profile, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Show' : isEdit ? 'Update' : 'Create'} Profile`,
            href: route('profiles.create'),
        },
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama_profile: profile?.nama_profile || '',
        alamat_profile: profile?.alamat_profile || '',
        phone_profile: profile?.phone_profile || '',
        foto_awal: null as File | null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            put(route('profiles.update', profile.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('profiles.store'), {
                onSuccess: () => reset(),
            });
        }

        console.log('data', data);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            setData('foto_awal', e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="ml-auto">
                <Link
                    as="button"
                    className="text-md flex w-fit cursor-pointer items-center rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                    href={route('profiles.index')}
                >
                    <ArrowLeftIcon className="me-2" /> Back to Profiles
                </Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {isView ? 'Show' : isEdit ? 'Update' : 'Create'}{' '}
                            Profile
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-4"
                            autoComplete="off"
                        >
                            <div className="grid gap-6">
                                {/* Nama Profile */}
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_profile">
                                        Nama Profile
                                    </Label>
                                    <Input
                                        value={data.nama_profile}
                                        onChange={(e) =>
                                            setData(
                                                'nama_profile',
                                                e.target.value,
                                            )
                                        }
                                        id="nama_profile"
                                        name="nama_profile"
                                        type="text"
                                        placeholder="Nama Profile"
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />

                                    <InputError message={errors.nama_profile} />
                                </div>

                                {/* Alamat Profile */}
                                <div className="grid gap-2">
                                    <Label htmlFor="alamat_profile">
                                        Alamat Profile
                                    </Label>

                                    <CustomTextarea
                                        value={data.alamat_profile}
                                        onChange={(e) =>
                                            setData(
                                                'alamat_profile',
                                                e.target.value,
                                            )
                                        }
                                        id="alamat_profile"
                                        name="alamat_profile"
                                        placeholder="Alamat Profile"
                                        autoFocus
                                        rows={4}
                                        tabIndex={2}
                                        disabled={isView || processing}
                                    />
                                    <InputError
                                        message={errors.alamat_profile}
                                    />
                                </div>

                                {/* Phone Profile */}
                                <div className="grid gap-2">
                                    <Label htmlFor="phone_profile">
                                        phone Profile
                                    </Label>
                                    <Input
                                        value={data.phone_profile}
                                        onChange={(e) =>
                                            setData(
                                                'phone_profile',
                                                e.target.value,
                                            )
                                        }
                                        id="phone_profile"
                                        name="phone_profile"
                                        type="text"
                                        placeholder="Phone Profile"
                                        autoFocus
                                        tabIndex={3}
                                        disabled={isView || processing}
                                    />
                                    <InputError
                                        message={errors.phone_profile}
                                    />
                                </div>

                                {/* foto awal */}
                                {!isView && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="foto_awal">
                                            Foto Awal
                                        </Label>
                                        <Input
                                            // value={data.foto_awal}
                                            onChange={handleFileUpload}
                                            id="foto_awal"
                                            name="foto_awal"
                                            type="file"
                                            autoFocus
                                            tabIndex={4}
                                        />
                                        <InputError
                                            message={errors.foto_awal}
                                        />
                                    </div>
                                )}

                                {/* display image */}
                                {isView ||
                                    (isEdit && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="foto_awal">
                                                Current Foto
                                            </Label>
                                            <img
                                                src={`/storage/${profile.foto_awal}`}
                                                alt="foto"
                                                className="h-40 w-50 rounded-lg border"
                                            />
                                        </div>
                                    ))}

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
                                        Profile
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
