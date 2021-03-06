            
export default class Buttonmethods{   



            async  markAsRented(backend, vehicle) {
                let links = vehicle._links.patch
                let body= {body: {
                    brand: vehicle.brand,
                    model: vehicle.model,
                    type: vehicle.type,
                    production_date: vehicle.production_date,
                    status: "rented"
                }}
                await backend.fetch(links.method, links.url, body)
                alert("Das Fahrzeug wurde ausgeliehen!")
            }

            async markAsAvailable(backend, vehicle) {
                let links = vehicle._links.patch
                let body= {body: {
                    brand: vehicle.brand,
                    model: vehicle.model,
                    type: vehicle.type,
                    production_date: vehicle.production_date,
                    status: "available"
                }}
                await backend.fetch(links.method, links.url, body)
                alert("Das Fahrzeug wurde zurückgegeben!")
            }
            async deleteVehicle(backend, vehicle) {
                let links = vehicle._links.delete
                await backend.fetch(links.method, links.url)
                alert("Das Fahrzeug wurde gelöscht!")
            }
        
}