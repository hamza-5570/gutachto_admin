export const accounts = [
  {
    account_type: "car mechanic",
    address: "61st lane, Düsseldorf",
    first_name: "John",
    last_name: "Doe",
    meta_data: {
      company_name: "fixer incorporated",
      corporation_contract: "http://example.com/contract.pdf",
    },
    password: "pass123",
    phone: "91512019038",
    username: "test@example.com",
  },
];

export const cases = [
  {
    _id: "680905a2156aaac899110827",
    account_id: "6808f458156aaac89911081b",
    start_date: "2025-04-10T12:34:58.860000",
    date_of_last_change: "2025-04-10T12:34:58.860000",
    person_in_charge: "asdas",
    witness: [
      {
        id: "680905a2156aaac89911081d",
        address: "sadasd",
      },
    ],
    internal_inspector: "adasd",
    car_repair_shop: "232",
    accident: {
      id: "680905a2156aaac89911081e",
      date: "2025-04-22T19:00:00",
      location: "qweqw",
      vehicle_images: [
        {
          id: "680905a2156aaac89911081f",
          angle: "diagonal view",
          image_url: "",
        },
        {
          id: "680905a2156aaac899110820",
          angle: "diagonal view",
          image_url:
            "http://64.226.121.124/static/6808f458156aaac89911081b_veri.f247d9b89eed1f02cf33.png",
        },
        {
          id: "680905a2156aaac899110821",
          angle: "diagonal view",
          image_url:
            "http://64.226.121.124/static/6808f458156aaac89911081b_images.jpeg",
        },
        {
          id: "680905a2156aaac899110822",
          angle: "diagonal view",
          image_url:
            "http://64.226.121.124/static/6808f458156aaac89911081b_veri.f247d9b89eed1f02cf33.png",
        },
        {
          id: "680905a2156aaac899110823",
          angle: "diagonal view",
          image_url:
            "http://64.226.121.124/static/6808f458156aaac89911081b_images.jpeg",
        },
      ],
      vehicle_id: "12",
      vehicle_opponent_license_plate: "2323",
      accident_description: "dasda",
    },
    damage: {
      id: "680905a2156aaac899110824",
      rear_impact_crash: true,
      lane_change: true,
      right_of_way_violation: true,
      parking_lot: true,
      other: "12",
      description: "wqe",
      diagonal_view: true,
      view_of_damage: true,
      prior_damage: true,
      tires: true,
      status: "qwewq",
    },
    status: "case created",
    report: {
      id: "680905a2156aaac899110825",
      dismantling_fee: 12,
      total_car_damage_sum: 12,
      inspector_fee: 12,
      lawyer_fee: 12,
    },
    police_file: "asdasd",
    mail_correspondence: ["sadasd"],
    invoice: {
      id: "680905a2156aaac899110826",
      total_invoiced_amount: 1322,
      open_sum: 232,
      paid_sum: 232,
    },
    notes: "sdsada",
  },
];
