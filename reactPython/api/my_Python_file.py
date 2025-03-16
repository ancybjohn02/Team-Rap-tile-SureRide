def process_coordinates(source, destination):
    # Example processing (replace with your own logic)
    distance = ((destination["lat"] - source["lat"])**2 + 
                (destination["lng"] - source["lng"])**2) ** 0.5

    return {"Peak Score": distance, "message": "Calculated successfully"}
