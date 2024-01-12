import Image from 'next/image'
import { auth, signOut } from '../../app/auth';
import Button from '@mui/material/Button';

export default async  function Dashboard() {
let session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Sign out
        </Button>
        </form>
    </main>
  )
}
