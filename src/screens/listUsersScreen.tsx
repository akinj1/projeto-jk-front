import { ListUsers } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export function ListUsersScreen() {

  return (
    <>
      <div className="pt-8 flex justify-center w-screen">
        <Card className="w-11/12">
          <div className="flex justify-between space-y-1.5 p-6 items-baseline">
            <div>
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>Adicione novos usuarios.</CardDescription>
            </div>
            <Button>Novo</Button>
          </div>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <ListUsers />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
