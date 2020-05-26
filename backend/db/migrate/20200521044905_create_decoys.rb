class CreateDecoys < ActiveRecord::Migration[5.2]
  def change
    create_table :decoys do |t|
      t.string :name

      t.timestamps
    end
  end
end
