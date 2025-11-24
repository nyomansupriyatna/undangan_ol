import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CirclePlusIcon, Eye, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ucapan',
        href: '/ucapans',
    },
];

interface ucapan {
    id: number;
    nama: string;
    ucapan: string;
    keterangan: string;
}

export default function Index({ ...props }: { ucapans: ucapan[] }) {
    const { ucapans } = props;
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(flash?.success || flash?.error ? true : false);

    
    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            },3000)
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert
                        variant={'default'}
                        className={`${flash?.success ? 'bg-green-800' : flash?.error ? 'bg-red-800' : ''} ml-auto max-w-md text-white`}
                    >
                        <AlertDescription className="text-white">
                            {flash.success ? 'Success!' : 'Error!'} {''}{' '}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="ml-auto">
                    <Link
                        className="text-md flex cursor-pointer items-center rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        as="button"
                        href={route('ucapans.create')}
                    >
                        <CirclePlusIcon className="me-2" /> Tambah ucapan
                    </Link>
                </div>

                <div className="overflow-scroll rounded-lg border bg-white shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="border p-4">#</th> 
                                <th className="border p-4">Nama</th>
                                <th className="border p-4">Ucapan</th>
                                <th className="border p-4">Keterangan</th>
                                <th className="border p-4">Created At</th>
                                <th className="border p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ucapans.length > 0 ? (
                                ucapans.map((ucapan, index) => (
                                    <tr key={index} className="text-gray-800">
                                        <td className="border px-4 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {ucapan.nama}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {ucapan.ucapan}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {ucapan.keterangan}
                                        </td>
                                        <td className="border px-4 py-2 text-center whitespace-nowrap">
                                            {ucapan.created_at}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <div className='flex gap-1'>
                                                 <Link
                                                    as="button"
                                                    className="cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-80"
                                                    href={route('ucapans.show', ucapan.id)}
                                                >
                                                    <Eye size={18} />
                                                </Link>

                                                <Link
                                                    as="button"
                                                    className="ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-80"
                                                    href={route('ucapans.edit', ucapan.id)}
                                                >
                                                    <Pencil size={18} />
                                                </Link>

                                                <Button
                                                    className="ms-2 cursor-pointer rounded-lg bg-red-600 p-2 text-white hover:opacity-80"
                                                    onClick={() => {
                                                        if (confirm('Are you sure want to delete this ucapan?')) 
                                                            {
                                                            router.delete(route('ucapans.destroy', ucapan.id));
                                                        }
                                                    }}
                                                    href={route('ucapans.destroy', ucapan.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                           
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-md py-4 text-center font-bold text-red-700"
                                    >
                                        No Records Found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

